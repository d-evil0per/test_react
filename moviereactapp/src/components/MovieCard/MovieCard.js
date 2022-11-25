import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { pink } from '@mui/material/colors';
import { Fab } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";



const MovieCard = (props) => {
    // const navigate = useNavigate();
    // const OpenMovie =(title)=>{
    //     navigate("/title");
    // }
    return (
        <>
            <Typography gutterBottom variant="h6" component="div">
                Movie
            </Typography>
            {/* <div style={{display:'flex', flexDirection:'row'}}> */}
            <Box
        sx={{
            display: "flex",
            justifyContent: "center" ,
            gap: "20px",
            flexWrap: "wrap",
            margin: "auto",
            width: "90vw",
        }}
      >
                {props.movies.map((movie, index) => (
                    <Card key ={ movie.id} sx={{ width: 250, height: 300, margin: "10px", display:'flex', flexDirection:'row' }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="200"
                                image={movie.posterurl}
                                // onClick={()=>OpenMovie(movie.title)}
                            />
                            <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                                <h6>{movie.title}</h6>
                                <div onClick={()=>props.handlefav(movie)}>
                                    
                                    <p>Add to Favourites <FavoriteIcon fontSize="small" sx={{ color: pink[500]}} /></p>
                                    
                                </div>
                            </CardContent>
                        </CardActionArea>
                    </Card>

                ))}
            {/* </div> */}
            </Box>
            
            


        </>
    )
}

export default MovieCard