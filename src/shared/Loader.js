import loaderStyles from './Loader.module.css'

function Loader() {
  

  return (
      
          <div className={loaderStyles.bg}>
              <div className={loaderStyles.ldsGrid}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
              </div>
     
  );
}

export default Loader;