import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from '@mui/material'
import { theme } from './theme/theme.ts'
import moment from 'moment'

moment.updateLocale('en', {
  relativeTime : {
      future: "in %s",
      past:   "%s",
      s  : 'now',
      ss : '%ds',
      m:  "%dm",
      mm: "%dm",
      h:  "%dh",
      hh: "%dh",
      d:  "%dd",
      dd: "%dd",
      w:  "%dw",
      ww: "%dw",
      M:  "%dmo",
      MM: "%dmo",
      y:  "%dy",
      yy: "%dy" }
    });


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
  </React.StrictMode>,
)
