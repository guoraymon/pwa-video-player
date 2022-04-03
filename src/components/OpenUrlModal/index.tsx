import { Form, Input, Modal } from "antd";

interface IOpenUrlModalProps {
    visible: boolean;
    onCancel: () => void;
    handleSubmit: (url: string) => void;
}

function OpenUrlModal(props: IOpenUrlModalProps) {
    const [form] = Form.useForm();

    return (
        <Modal
            visible={props.visible}
            title="打开链接"
            onCancel={props.onCancel}
            onOk={() => {
                form
                    .validateFields()
                .then(values => {
                    props.handleSubmit(values.url)
                    form.resetFields()
                })
            }}
        >
            <Form form={form} >
                <Form.Item
                    name="url"
                    rules={[{ required: true, message: '链接不能为空' }]}
                >
                    <Input placeholder="请输入链接" />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default OpenUrlModal