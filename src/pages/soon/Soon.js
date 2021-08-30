import soonStyles from './Soon.module.css';

function Soon(){
    return(
        <div className={soonStyles.divv} id={soonStyles.yazı}>█ █ █ <span className={soonStyles.spann} style={{color: 'black'}}>█ █ █ █ █ █ █ █ █ █ </span>31%
        <br />&gt; Site Yapım Aşamasında&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <br />&gt; Yakında Hizmete  <span className={soonStyles.spann} id={soonStyles.imleç}>█</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </div>
    );
}
export default Soon;