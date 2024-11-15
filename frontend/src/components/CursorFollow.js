import { useState,useEffect } from 'react';

// Cursor Follow Component
const CursorFollow = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [followerPosition, setFollowerPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setCursorPosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Update follower position with a small delay to make it feel smooth but not too sluggish
  useEffect(() => {
    const moveFollower = () => {
      setFollowerPosition({
        x: cursorPosition.x - -10, // Slightly behind the cursor (adjust as necessary)
        y: cursorPosition.y - -10, // Slightly behind the cursor (adjust as necessary)
      });
    };

    // Use requestAnimationFrame for smoother transitions
    const animationFrame = requestAnimationFrame(moveFollower);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [cursorPosition]);

  return (
    <div>
      {/* Outer Circle with Glow */}
      <div
        style={{
          position: 'absolute',
          top: followerPosition.y,  // Position just behind the cursor
          left: followerPosition.x, // Position just behind the cursor
          width: '25px',  // Outer circle size
          height: '25px', // Outer circle size
          backgroundColor: 'transparent',
          border: '1px solid red',  // Circle outline color
          borderRadius: '50%',
          pointerEvents: 'none',
          boxShadow: '0 0 10px rgba(155, 28, 28, 1)', // Glowing effect
        }}
      />

      {/* Inner Dot with Glow */}
      <div
        style={{
          position: 'absolute',
          top: followerPosition.y + 7,  // Position just behind the cursor
          left: followerPosition.x + 8, // Position just behind the cursor
          width: '10px',  // Inner dot size
          height: '10px', // Inner dot size
          backgroundColor: '#9b1c1c',
          borderRadius: '50%',
          pointerEvents: 'none',
          boxShadow: '0 0 5px rgba(155, 28, 28, 1)', // Glowing effect on inner dot
        }}
      />
    </div>
  );
};


export default CursorFollow;