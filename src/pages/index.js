import React, { useEffect } from 'react';
import { Link, graphql } from 'gatsby';

/**
 * Configuration Section
 * Define all configurable settings here.
 */
const CONFIG = {
  ytPlayer: {
    videoURL: 'https://youtu.be/L3Dp4oGkn3k', // Replace with your YouTube video URL
    containment: 'body', // Define the container
    autoPlay: true, // Autoplay the video
    mute: true, // Mute the video
    startAt: 0, // Start time in seconds
    opacity: 1, // Opacity of the video background
    showControls: false, // Show player controls
    loop: true, // Loop the video
  },
  pageStyles: {
    containerMaxWidth: '800px',
    headingFontSize: '2.5em',
    postCardBackgroundColor: 'rgba(0, 0, 0, 0.8)', // Background color for post cards
  },
};

export default function HomePage({ data }) {
  useEffect(() => {
    let isPlayerReady = false;

    // Check if the YTPlayer script is already loaded
    const isScriptLoaded = (src) => !!document.querySelector(`script[src="${src}"]`);

    const loadScript = (src, onLoad) => {
      if (isScriptLoaded(src)) {
        onLoad();
        return;
      }
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = onLoad;
      document.body.appendChild(script);
    };

    // Load jQuery first
    loadScript('https://code.jquery.com/jquery-3.6.0.min.js', () => {
      // Once jQuery is loaded, load YTPlayer
      loadScript(
        'https://cdnjs.cloudflare.com/ajax/libs/jquery.mb.YTPlayer/3.3.9/jquery.mb.YTPlayer.min.js',
        () => {
          // Initialize the YTPlayer after the library is loaded
          const player = window.$('.ytplayer');
          player.YTPlayer({
            videoURL: CONFIG.ytPlayer.videoURL,
            containment: CONFIG.ytPlayer.containment,
            autoPlay: CONFIG.ytPlayer.autoPlay,
            mute: CONFIG.ytPlayer.mute,
            startAt: CONFIG.ytPlayer.startAt,
            opacity: CONFIG.ytPlayer.opacity,
            showControls: CONFIG.ytPlayer.showControls,
            loop: CONFIG.ytPlayer.loop,
          });

          // Listen for the player being ready
          player.on('YTPReady', () => {
            isPlayerReady = true;
          });
        }
      );
    });

    // Cleanup function to pause the video on component unmount
    return () => {
      const player = window.$('.ytplayer');
      if (isPlayerReady && player && player.length) {
        player.YTPPause();
      }
    };
  }, []);

  return (
    <div>
      {/* YouTube Player */}
      <div className="ytplayer" />

      {/* Blog Posts */}
      <div
        style={{
          maxWidth: CONFIG.pageStyles.containerMaxWidth,
          margin: '0 auto',
          padding: '20px',
          fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif',
          lineHeight: '1.6',
          color: '#fff',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <h1
          style={{
            fontSize: CONFIG.pageStyles.headingFontSize,
            textAlign: 'center',
            marginBottom: '30px',
            color: '#fff',
          }}
        >
          TM's Template :)
        </h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {data.allMarkdownRemark.edges.map(({ node }) => {
            const firstParagraph = node.html.match(/<p>(.*?)<\/p>/)?.[0] || '<p>No content available.</p>';

            return (
              <div
                key={node.frontmatter.path}
                style={{
                  padding: '20px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '6px',
                  backgroundColor: CONFIG.pageStyles.postCardBackgroundColor,
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.5)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
              >
                <h2 style={{ fontSize: '1.5em', marginBottom: '10px', color: '#fff' }}>
                  <Link to={node.frontmatter.path} style={{ color: '#ffdd57', textDecoration: 'none' }}>
                    {node.frontmatter.title}
                  </Link>
                </h2>
                <small style={{ fontSize: '0.9em', color: '#ddd', marginBottom: '10px' }}>
                  Template: {node.frontmatter.template}
                </small>
                <div
                  dangerouslySetInnerHTML={{ __html: firstParagraph }}
                  style={{ marginTop: '10px' }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export const query = graphql`
  query {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            path
            title
            template
          }
          html
        }
      }
    }
  }
`;
