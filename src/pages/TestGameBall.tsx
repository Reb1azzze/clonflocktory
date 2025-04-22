const TestGameBall = () => {
    return (
        <div style={{ background: 'grey', height: '100dvh'}}>
            <iframe src={"/gameBall.html"}
                    title={'GameBall'}
                    width="50%"
                    height="600px"
                    style={{ marginTop:"10%"}} />
        </div>
    );
};

export default TestGameBall;