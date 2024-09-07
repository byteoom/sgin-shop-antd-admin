import { resourceApi } from '@/services';
import { message, UploadFile } from 'antd';

const handleUpload = async (fileList: UploadFile<any>[]) => {
  const uploadedFiles: string[] = [];
  const formData = new FormData();

  if (fileList.length === 0) {
    message.error('请上传产品图片');
    return [];
  }

  // 将所有文件添加到 FormData 对象中
  for (let file of fileList) {
    formData.append('files', file.originFileObj as any); // 直接将文件添加到 FormData
  }
  formData.append('path', '/'); // 上传到 product 文件夹

  // 调用 API 上传文件并获取资源 ID 列表
  try {
    const resource = await resourceApi.createResource(formData); // 假设 createResource 接收 FormData 对象

    if (resource && Array.isArray(resource.data)) {
      resource.data.forEach((res) => {
        if (res.uuid) {
          uploadedFiles.push(res.uuid);
        } else {
          message.error(`上传文件失败，资源 ID 缺失`);
        }
      });
    } else {
      message.error(`上传文件失败`);
      return [];
    }
  } catch (error) {
    message.error(`文件上传过程中出现错误`);
    return [];
  }

  return uploadedFiles;
};

export default handleUpload;
