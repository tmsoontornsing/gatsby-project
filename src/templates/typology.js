export default function TypologyTemplate({ children, title }) {
    return (
      <>
        <style jsx global>{`
          body {
            font-family: 'Domine', serif;
            line-height: 1.88;
            font-size: 1.6rem;
            margin: 0;
          }
          
          .typology-header {
            height: 110px;
            position: fixed;
            width: 100%;
            top: 0;
            left: 0;
            z-index: 9001;
            background: #c62641;
          }
          
          .typology-section {
            max-width: 1170px;
            margin: 0 auto;
            padding: 16rem 0 15rem;
            box-shadow: 0 30px 50px 0 rgba(1,1,1,.15);
            background: #ffffff;
          }
          
          .section-content {
            max-width: 720px;
            margin: 0 auto;
          }
          
          .entry-content {
            margin-bottom: 6rem;
          }
        `}</style>
  
        <header className="typology-header">
          <div className="container">
            <h1>{title}</h1>
          </div>
        </header>
        
        <div className="typology-section">
          <div className="section-content">
            <article className="typology-post">
              <div className="entry-content">
                {children}
              </div>
            </article>
          </div>
        </div>
      </>
    )
  }