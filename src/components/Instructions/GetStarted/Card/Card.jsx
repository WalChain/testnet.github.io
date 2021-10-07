import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import styles from './Card.module.scss';
import AddToHomeScreenIcon from '@mui/icons-material/AddToHomeScreen';
import CreateIcon from '@mui/icons-material/Create';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AlignVerticalBottomIcon from '@mui/icons-material/AlignVerticalBottom';
import AppsIcon from '@mui/icons-material/Apps';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Content = ({ number }) => {
  const icon = () => {
    return (
      (number === 1 && <AddToHomeScreenIcon />) ||
      (number === 2 && <CreateIcon />) ||
      (number === 3 && <AddShoppingCartIcon />) ||
      (number === 4 && <AlignVerticalBottomIcon />) ||
      (number === 5 && <AppsIcon />) ||
      (number === 6 && <ArrowForwardIcon />)
    );
  };
  return (
    <div>
      <Card className={styles.card} sx={{ minWidth: 275 }}>
        <CardContent className={styles.container}>
          <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
            {icon()}
          </Typography>
          <Typography className={styles.step} variant='h5' component='div'>
            Etape {number}
          </Typography>
          <Typography className={styles.content} variant='body2'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum
            minima asperiores vel tenetur quod, delectus consequuntur vero,
            saepe temporibus nam ratione vitae rem? Tempora placeat sequi,
            numquam laudantium cumque cupiditate. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Dignissimos voluptatem molestias
            aliquid corporis. Molestiae eius fugit sapiente adipisci labore
            recusandae alias quas, error laudantium. Nisi aliquid reprehenderit
            consectetur tempora sint?
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Content;
