import './loading.css'

const Loading = () => {
  return (
    <div className='p-10 scale-50 flex justify-center items-center flex-col'>
      <div className="hand">
        <span className="finger thumb"></span>
        <span style={{"--n" : 2}} className="finger"></span>
        <span style={{"--n" : 3}} className="finger"></span>
        <span style={{"--n" : 4}} className="finger"></span>
        <span style={{"--n" : 5}} className="finger"></span>
        <span className="palm"></span>
      </div>
      <h1 className='loading mt-10 uppercase text-white drop-shadow-2xl tracking-widest text-3xl text-center font-bold'>
        Loading
      </h1>
    </div>
  )
}

export default Loading