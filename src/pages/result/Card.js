import ResultStyles from './Result.module.css';

function Card(props){
    return (
        <div className={ResultStyles.parent}>
          <div className={ResultStyles.info}>
            <img src={props.dpUrl} alt="" width={100} height={100} className={ResultStyles.image}/>
            <div className={ResultStyles.name_place}>
              <p className={ResultStyles.name}>{props.name}</p>
              <p className={ResultStyles.location}>{props.city}, {props.state}</p>
            </div>
          </div>
          <button className={ResultStyles.butn}>
            
          </button>
        </div>
    );
}

export default Card;