import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  // border: `1px solid ${theme.palette.divider}`,

  '&:not(:last-child)': {
    borderBottom: 0,
    marginBottom: '2em'
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  // backgroundColor:
  //   theme.palette.mode === 'dark'
  //     ? 'rgba(255, 255, 255, .05)'
  //     : 'rgba(0, 0, 0, .03)',
  background: 'linear-gradient(90deg, #FFC0CB 50%, #00FFFF 50%)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  border: '1px solid rgba(0, 0, 0, .125)',
}));

export default function SimpleAccordion({ years, booksCount, books }) {
  const [expanded, setExpanded] = React.useState('2022');
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      {years.map((year) => (
        <Accordion key={Math.random()}>
          <AccordionSummary
            key={Math.random()}
            expanded={expanded ? 'year' : undefined} onChange={handleChange('year')}
          >
            <Typography
              sx={{
                fontWeight: 'bold',
                fontSize: 'calc(1vw + 1vmin)',
                color: '#fff'
              }}
            >
              {year}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {books.map((book) => (
                <Box
                  key={book}
                  component="img"
                  sx={{
                    // height: 233,
                    // width: 350,
                    // maxHeight: { xs: 233, md: 167 },
                    // maxWidth: { xs: 350, md: 250 },
                    paddingRight: 5
                  }}
                  alt="Book cover image"
                  src={book}
                />
              ))}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
