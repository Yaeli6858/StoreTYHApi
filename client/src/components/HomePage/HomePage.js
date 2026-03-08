import { Button, Box, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: { xs: "80vh", md: "80vh" },
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mb: 6,
      }}
    >
      {/* תמונה */}
      <Box
        component="img"
        src="/back.jpg"
        alt="background"
        sx={{
          width: "100%",
          height: "80%",
          objectFit: "cover",
        }}
      />

      {/* טקסט וכפתור */}
      <Box
        sx={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          px: 2
        }}
      >
        <Typography
          variant="h1"
          sx={{
            color: "white",
            fontSize: { xs: "6vw", md: "4vw" },
            fontWeight: 600
          }}
        >
          A grateful life
        </Typography>
        <Typography
          variant="h1"
          sx={{
            color: "#06213F",
            fontSize: { xs: "7vw", md: "5vw" },
            fontWeight: 700
          }}
        >
          is a great full life
        </Typography>
        <Typography
          sx={{
            color: "white",
            fontSize: { xs: "4vw", md: "1.7vw" },
            mt: { xs: 3, md: 4 }
          }}
        >
          Connect with thousands of Jews
        </Typography>
        <Typography
          sx={{
            color: "white",
            fontSize: { xs: "4vw", md: "1.7vw" }
          }}
        >
          united by the joy of thanking Hashem.
        </Typography>

        {/* כפתור */}
        <Button
          onClick={() => navigate("/Products")}
          sx={{
            mt: { xs: 4, md: 6 },
            px: 4,
            py: 1.5,
            fontSize: { xs: "3.5vw", md: "1vw" },
            color: '#06213f',
            backgroundColor: 'rgba(6, 33, 63, 0.05)',
            '&:hover': {
              backgroundColor: '#06213f',
              color: 'white'
            }
          }}
          variant="contained"
        >
          Shop now
        </Button>
      </Box>
    </Box>
  )
}

export default HomePage

//added by devora!!! good confict
