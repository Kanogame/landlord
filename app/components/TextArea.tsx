import { useState, useRef, useEffect } from 'react';
import { ErrorToast } from '~/lib/api';

export interface TextAreaProps {
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
  maxLength?: number;
  className?: string;
}

export default function TextArea({
  placeholder = 'Начните вводить текст',
  value = '',
  onChange,
  maxLength,
  className = '',
}: TextAreaProps) {
  const textarea = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (textarea.current) {
      textarea.current.style.height = 'auto';
      textarea.current.style.height = textarea.current?.scrollHeight + 'px';
    }
    if (maxLength && newValue.length > maxLength) {
      ErrorToast('Превышен максимальный размер текста: 5000 символов');
      return;
    }
    onChange(newValue);
  };
  return (
    <div
      className={className}
      style={{
        padding: 10,
        background: '#EFEFEF',
        borderRadius: 10,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 10,
        display: 'inline-flex',
      }}
    >
      <textarea
        ref={textarea}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className="w-full h-[100px] resize-none border-none outline-hidden bg-transparent h5-def placeholder:text-[#707070]"
      />
    </div>
  );
}
