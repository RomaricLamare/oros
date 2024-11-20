import { Button } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import styles from '../components/MainNav/MainNav.module.css';

function CategoryButton({name, id}: {name: string, id: string}) {
// on défini plusieurs breakpoints pour le responsive avec MUI
  const isSmallScreen = useMediaQuery('(max-width:550px)');
  const isMediumScreen = useMediaQuery('(max-width:1000px)');
  const isLargeScreen = useMediaQuery('(min-width:1001px)');

  // on détermine les largeurs basées en fonction des breakpoints
    let buttonWidth;
    let buttonFontSize;
    
  if (isSmallScreen) {
    buttonWidth = 150;
    buttonFontSize = 12
  } else if (isMediumScreen) {
    buttonWidth = 150;
    buttonFontSize = 12 ;
  } else if (isLargeScreen) {
    buttonWidth = 285;
  }

    return (
        <div>
          <Button className={styles.categoryButton} variant="contained" href={`/categories/${id}`} style={{width: buttonWidth, fontSize: buttonFontSize }}>{name}</Button>
        </div>
    );
}

export default CategoryButton;