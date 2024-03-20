
import  './Tabs.css'
function Button(data) {
  return (
    <div >
        <button onClick={data.onClick} className={data.className} style={{...data.styling,border:'none'}} >{data.discription}</button>
    </div>
  )
}
export default Button