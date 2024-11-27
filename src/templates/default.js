export default function DefaultTemplate({ children, title }) {
  return (
    <>
      <style jsx global>{`
        body {
          font-family: Arial, sans-serif;
          margin: 20px;
          line-height: 1.6;
        }
        
        h1, h2, h3 {
          color: #333;
        }
        
        .content {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        
        pre {
          background: #f4f4f4;
          padding: 10px;
          overflow-x: auto;
        }
      `}</style>

      <div className="content">
        <h1>{title}</h1>
        {children}
      </div>
    </>
  )
}