import { resourceApi } from '@/services';
import { Resource } from '@/services/types';
import getBase64, { FileType } from '@/utils/getBase64';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Spin, Upload } from 'antd';
import { UploadChangeParam, UploadFile } from 'antd/es/upload';
import { useEffect, useState } from 'react';

interface HaoUploadProps {
  onChange?: (value: any) => void;
  value?: string | string[];
}

const HaoUpload = ({ value, onChange }: HaoUploadProps) => {
  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRemove = (file: UploadFile<any>) => {
    if (value instanceof Array) {
      const index = value.findIndex((item) => item === file.name);
      console.log(index);

      const newValue = value.splice(index + 1, 1);
      console.log(newValue);

      onChange?.(newValue);
    } else {
      onChange?.('');
    }
  };

  const handleChange = async (info: UploadChangeParam<UploadFile<any>>) => {
    if (info.file.status === 'removed') return handleRemove(info.file);
    const list: Resource[] = [];
    setLoading(true);

    try {
      for (const file of info.fileList) {
        if (file.status === 'uploading') {
          const formData = new FormData();
          formData.append('files', file.originFileObj as any);
          const result = await resourceApi.createResource(formData);
          if (result.data instanceof Array) {
            list.push(...result.data);
          } else {
            list.push(result.data);
          }
        }
      }

      if (typeof value === 'string') {
        return onChange?.(list[0].address);
      } else if (value instanceof Array) {
        onChange?.([...value, ...list.map((item) => item.address)]);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  useEffect(() => {
    if (value) {
      if (typeof value === 'string' && value) {
        setFileList([{ uid: String(Date.now()), name: value, url: value }]);
      } else {
        setFileList([]);
      }
      if (Array.isArray(value) && value.length) {
        setFileList(
          value.map((item, index) => ({
            uid: `${String(Date.now()) + '-' + index}`,
            name: item,
            url: item,
          })),
        );
      } else {
        setFileList([]);
      }
    }
  }, [value]);

  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList.map((item) => ({
          ...item,
          url: `/public/${item.url}`,
        }))}
        maxCount={1}
        onPreview={handlePreview}
        onChange={handleChange}
        // onRemove={handleRemove}
        multiple
        disabled={loading}
      >
        {loading ? (
          <Spin />
        ) : (
          <div className="flex flex-col items-center">
            <PlusOutlined /> Upload
          </div>
        )}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default HaoUpload;
