import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import * as tf from '@tensorflow/tfjs';
import * as cocossd from '@tensorflow-models/coco-ssd';

const ParkingAnalysis = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState([]);
  const [currentFrame, setCurrentFrame] = useState(null);
  const [currentAnalysis, setCurrentAnalysis] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const modelRef = useRef(null);
  const frameIntervalRef = useRef(null);

  // Load YOLO model
  useEffect(() => {
    async function loadModel() {
      try {
        await tf.ready();
        const model = await cocossd.load();
        modelRef.current = model;
        console.log('Model loaded successfully');
      } catch (err) {
        console.error('Failed to load model:', err);
      }
    }
    loadModel();

    return () => {
      if (modelRef.current) {
        modelRef.current.dispose();
      }
      clearInterval(frameIntervalRef.current);
    };
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file);
      setAnalysisResults([]);
      setCurrentFrame(null);
      setCurrentAnalysis(null);
    }
  };

  const startAnalysis = async () => {
    if (!videoFile || !modelRef.current) return;

    setIsProcessing(true);
    const video = videoRef.current;
    video.src = URL.createObjectURL(videoFile);

    await new Promise((resolve) => {
      video.onloadedmetadata = resolve;
    });

    video.play();
    const fps = 30; // Standard frame rate
    const frameInterval = 8; // Analyze every 8 seconds (8 * fps frames)

    let frameCount = 0;
    const results = [];

    const processFrame = async () => {
      if (video.paused || video.ended) return;

      // Only process every nth frame
      if (frameCount % (fps * frameInterval) === 0) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        // Set canvas dimensions
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // Draw frame to canvas
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Get current frame as image
        const frameImage = canvas.toDataURL('image/jpeg');
        setCurrentFrame(frameImage);
        
        // Perform detection
        const predictions = await modelRef.current.detect(video);
        
        // Filter for vehicles (cars, trucks, buses)
        const vehicles = predictions.filter(pred => 
          ['car', 'truck', 'bus'].includes(pred.class)
        );
        
        // Calculate parking space availability
        const totalSpaces = 20; // This should be dynamically calculated or provided
        const occupiedSpaces = vehicles.length;
        const availableSpaces = Math.max(0, totalSpaces - occupiedSpaces);
        
        // Identify best spots (simplified logic)
        const bestSpots = [];
        if (availableSpaces > 0) {
          // This is simplified - in a real app you'd analyze the frame layout
          bestSpots.push('Near entrance (front row)');
          if (availableSpaces > 3) {
            bestSpots.push('Shaded area (north side)');
          }
          if (availableSpaces > 5) {
            bestSpots.push('Wide space (end of row)');
          }
        }
        
        // Draw detections
        drawDetections(ctx, predictions);
        
        // Create analysis result
        const result = {
          frameCount,
          timestamp: (frameCount / fps).toFixed(1),
          availableSpaces,
          bestSpots,
          vehicles: vehicles.map(v => ({
            class: v.class,
            confidence: v.score.toFixed(2),
            position: [
              Math.round(v.bbox[0]),
              Math.round(v.bbox[1])
            ]
          })),
          frameImage
        };
        
        setCurrentAnalysis(result);
        results.push(result);
        setAnalysisResults([...results]);
      }
      
      frameCount++;
      frameIntervalRef.current = requestAnimationFrame(processFrame);
    };
    
    video.addEventListener('play', () => {
      frameIntervalRef.current = requestAnimationFrame(processFrame);
    });
    
    video.onended = () => {
      setIsProcessing(false);
      console.log('Analysis complete', results);
    };
  };

  const drawDetections = (ctx, detections) => {
    detections.forEach(detection => {
      const [x, y, width, height] = detection.bbox;
      const class_name = detection.class;
      const confidence = detection.score;
      
      // Choose color based on class
      let color;
      if (class_name === 'car') color = '#3498db';
      else if (class_name === 'truck') color = '#e74c3c';
      else if (class_name === 'bus') color = '#9b59b6';
      else color = '#2ecc71';
      
      // Draw rectangle
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, width, height);
      
      // Draw label background
      const label = `${class_name} ${(confidence * 100).toFixed(0)}%`;
      ctx.font = '16px Arial';
      const textWidth = ctx.measureText(label).width;
      ctx.fillStyle = color;
      ctx.fillRect(x, y - 20, textWidth + 10, 20);
      
      // Draw label text
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(label, x + 5, y - 5);
    });
  };

  return (
    <Container>
      <Title>Parking Space Analysis</Title>
      
      <UploadSection>
        <FileInput 
          type="file" 
          accept="video/*" 
          onChange={handleFileChange}
          disabled={isProcessing}
        />
        <Button 
          onClick={startAnalysis} 
          disabled={!videoFile || isProcessing}
        >
          {isProcessing ? 'Analyzing...' : 'Start Analysis'}
        </Button>
      </UploadSection>
      
      <AnalysisContainer>
        <VideoCanvasSection>
          <VideoElement
            ref={videoRef}
            muted
            playsInline
            style={{ display: videoFile ? 'block' : 'none' }}
          />
          <Canvas ref={canvasRef} />
          
          {currentFrame && (
            <FrameInfo>
              <h3>Current Frame Analysis</h3>
              <FrameImage src={currentFrame} alt="Current frame" />
              {currentAnalysis && (
                <FrameAnalysis>
                  <p>Available spaces: {currentAnalysis.availableSpaces}</p>
                  {currentAnalysis.bestSpots.length > 0 ? (
                    <>
                      <p>Recommended spots:</p>
                      <ul>
                        {currentAnalysis.bestSpots.map((spot, i) => (
                          <li key={i}>{spot}</li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <p>No available parking spaces</p>
                  )}
                  <p>Timestamp: {currentAnalysis.timestamp}s</p>
                </FrameAnalysis>
              )}
            </FrameInfo>
          )}
        </VideoCanvasSection>
        
        <ResultsSection>
          <h3>Analysis Results</h3>
          {analysisResults.length > 0 ? (
            <ResultsList>
              {analysisResults.map((result, index) => (
                <ResultItem key={index}>
                  <ResultImage 
                    src={result.frameImage} 
                    alt={`Frame at ${result.timestamp}s`}
                    onClick={() => setCurrentAnalysis(result)}
                  />
                  <ResultDetails>
                    <p>Time: {result.timestamp}s</p>
                    <p>Spaces: {result.availableSpaces}</p>
                    <p>Vehicles: {result.vehicles.length}</p>
                  </ResultDetails>
                </ResultItem>
              ))}
            </ResultsList>
          ) : (
            <p>No analysis results yet. Upload and analyze a video.</p>
          )}
        </ResultsSection>
      </AnalysisContainer>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  color: #2c3e50;
  margin-bottom: 30px;
`;

const UploadSection = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  justify-content: center;
`;

const FileInput = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #2980b9;
  }

  &:disabled {
    background: #95a5a6;
    cursor: not-allowed;
  }
`;

const AnalysisContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const VideoCanvasSection = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const VideoElement = styled.video`
  width: 100%;
  max-height: 400px;
  background: #000;
`;

const Canvas = styled.canvas`
  width: 100%;
  max-height: 400px;
  background: #000;
  display: none; // We'll use it for processing but not display
`;

const FrameInfo = styled.div`
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  background: #f9f9f9;
`;

const FrameImage = styled.img`
  width: 100%;
  max-height: 300px;
  object-fit: contain;
  margin-bottom: 10px;
`;

const FrameAnalysis = styled.div`
  margin-top: 10px;

  ul {
    margin: 5px 0 0 20px;
    padding: 0;
  }
`;

const ResultsSection = styled.div`
  flex: 1;
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  background: #f9f9f9;
  max-height: 800px;
  overflow-y: auto;
`;

const ResultsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
  margin-top: 10px;
`;

const ResultItem = styled.div`
  cursor: pointer;
  border: 1px solid #ddd;
  padding: 5px;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    border-color: #3498db;
    background: #ebf5fb;
  }
`;

const ResultImage = styled.img`
  width: 100%;
  height: 80px;
  object-fit: cover;
`;

const ResultDetails = styled.div`
  margin-top: 5px;
  font-size: 12px;
  color: #555;
`;

export default ParkingAnalysis;