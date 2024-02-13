import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { ChangeEvent, useState } from 'react';
import { CustomFileUploadProps } from '../input.types';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function CustomFileUpload(props: CustomFileUploadProps) {
  const { label, onChange, className, icon, fileName, ...rest } = props;
  const [imageUrl, setImageUrl] = useState('');
  const customOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      if (e?.target?.files && e?.target?.files.length > 0) {
        const file = e?.target?.files[0] as File;
        onChange(e?.target?.files[0]);
        setImageUrl(URL.createObjectURL(file));
      }
    }
  };
  const handleRemove = () => {
    if (onChange) {
      onChange(null);
    }
    setImageUrl('');
  };

  return (
    <>
      <Button
        component="label"
        variant="outlined"
        disableRipple
        disableTouchRipple
        className="font-medium !justify-start border-dashed rounded-sm w-full !text-app-blue p-3"
        startIcon={icon}
      >
        {label}
        <VisuallyHiddenInput type="file" {...rest} onChange={customOnChange} />
      </Button>
      {imageUrl && (
        <div className="mt-3 w-full">
          <div className="flex justify-between">
            <p className="text-app-blue">{fileName}</p>
            <p className="text-red-500 cursor-pointer" onClick={handleRemove}>
              REMOVE
            </p>
          </div>
          {imageUrl && <img src={imageUrl} className="h-[150px] w-full" alt={label} />}
        </div>
      )}
    </>
  );
}
