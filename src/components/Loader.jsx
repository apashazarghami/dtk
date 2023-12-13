import { RotatingLines } from 'react-loader-spinner'
const Loader = () => {
    return(
        <div style={{width: 'calc(100vw - 4rem)', height: 'calc(100vh - 2rem)', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={true}
            />
        </div>
    )
}

export default Loader