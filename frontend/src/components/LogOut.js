import { Modal, Button } from 'antd';


const LogOut = (props) => {
    
    function countDown() {
    let secondsToGo = 5;
    const modal = Modal.success({
        title: 'You have successfully logged out!',
        content: `This window will be closed after ${secondsToGo} second.`,
    });
    const timer = setInterval(() => {
        secondsToGo -= 1;
        modal.update({
        content: `This window will be closed after ${secondsToGo} second.`,
        });
    }, 1000);
    setTimeout(() => {
        clearInterval(timer);
        modal.destroy();
    }, secondsToGo * 1000);
    }

    return (
        <Button type="link" onClick={countDown}>Log out</Button>
    )
}

export default LogOut;