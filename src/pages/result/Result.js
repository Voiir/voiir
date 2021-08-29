import Card from './Card';
import ResultStyles from './Result.module.css';

function Result(props){



    return (
        <div className={ResultStyles.masterPad}>
          {props.state.resultData.result.map((iter)=>(
            <Card name={iter.name} city={iter.city} state={iter.state} dpUrl={iter.dpUrl}></Card>
        ))}
      </div>
    );
}

export default Result;