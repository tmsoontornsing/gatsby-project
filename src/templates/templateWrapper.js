import React from 'react'
import GithubTemplate from './github'
import TypologyTemplate from './typology'
import DefaultTemplate from './default'

const templates = {
  github: GithubTemplate,
  typology: TypologyTemplate,
  default: DefaultTemplate
}

export default function TemplateWrapper({ pageContext, children }) {
  // Get template from URL or frontmatter
  const [template, setTemplate] = React.useState(pageContext.template || 'default')
  
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const urlTemplate = params.get('template')
    if (urlTemplate && templates[urlTemplate]) {
      setTemplate(urlTemplate)
    }
  }, [])

  const Template = templates[template]
  
  return (
    <>
      <div style={{ margin: '10px 0' }}>
        <select 
          value={template}
          onChange={(e) => setTemplate(e.target.value)}
          style={{ padding: '5px' }}
        >
          <option value="github">GitHub Style</option>
          <option value="typology">Typology Style</option>
          <option value="default">Default Style</option>
        </select>
      </div>
      
      <Template title={pageContext.title}>
        {children}
      </Template>
    </>
  )
}