import { Form, Input, Button, InputNumber } from "antd";
import { ethers } from "ethers";
import Web3 from "web3";
import useAccount from "../../../hooks/useAccount";

const CreateCharity = () => {
  const { charityDeposit } = useAccount();
  const [form] = Form.useForm();
  const ethValue = Form.useWatch("eth", form);

  const onFinish = (values) => {
    console.log("Success:", values);
    const ethF = ethers.utils.parseEther("" + values.eth);
    // alert(ethF);
    // return;
    charityDeposit(ethF, values.message);
  };
  // ethers.utils.formatEther(balance);
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div style={{ width: 400 }}>
      <Form
        name="basic"
        labelCol={{
          span: 4,
        }}
        //   wrapperCol={{
        //     span: 16,
        //   }}
        //   initialValues={{
        //     remember: true,
        //   }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label={"Số lượng ETH"}
          name="eth"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập số ETH muốn quyên góp",
            },
          ]}
        >
          {/* <Input /> */}
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Lời nhắn để lại"
          name="message"
          rules={[
            {
              required: true,
              message: "Vui lòng để lại lời nhắn",
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Quyên góp
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateCharity;
