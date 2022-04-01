import { useState } from 'react'
import { Menu, Dropdown } from 'antd';
import OpenUrlModal from './components/OpenUrlModal';

function App() {
  const [url, setUrl] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onClick = ({ key }: { key: string }) => {
    switch (key) {
      case 'openFile': {
        window.showOpenFilePicker({ multiple: false }).then(async handles => {
          const file = await handles[0].getFile()
          const url = URL.createObjectURL(file)
          setUrl(url)
        })
        break;
      }
      case 'openUrl': {
        setIsModalVisible(true)
        break;
      }
    }
  };

  const onCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = (value: string) => {
    setIsModalVisible(false);
    setUrl(value)

  };

  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key="openFile">打开文件</Menu.Item>
      <Menu.Item key="openUrl">打开链接</Menu.Item>
    </Menu>
  );

  return (
    <div className="App">
      <Dropdown overlay={menu} trigger={['contextMenu']}>
        <video
          src={url ? url : undefined}
          controls autoPlay
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            backgroundColor: 'black'
          }}
        >
        </video>
      </Dropdown>,
      <OpenUrlModal visible={isModalVisible} onCancel={onCancel} handleSubmit={handleSubmit} />
    </div>
  )
}

export default App
