import { Component, onCleanup, Signal } from 'solid-js';

import { noop } from '../../utils/noop';

type Props = {
  isDraggingSignal: Signal<boolean>;
  onDropJson?: (fileName: string, jsonObject: object) => void;
  onDropInvalidJson?: (err: unknown) => void;
};

const DndJsonHandler: Component<Props> = props => {
  const onDropJson = props.onDropJson ?? noop;
  const onDropInvalidJson = props.onDropInvalidJson ?? noop;
  const [, setIsDragging] = props.isDraggingSignal;

  setIsDragging(false);

  const element = document.getElementById('root');
  if (!element) {
    console.error('no root element found');
    return null;
  }

  const dragEnter = (event: DragEvent) => {
    setIsDragging(true);
    event.preventDefault();
  };

  const dragLeave = (event: DragEvent) => {
    setIsDragging(false);
    event.preventDefault();
  };

  const dragOver = (event: DragEvent) => {
    event.preventDefault();
  };

  const dragDrop = (event: DragEvent) => {
    setIsDragging(false);

    if (event.dataTransfer) {
      const file = event.dataTransfer.files[0];
      const reader = new FileReader();

      reader.onloadend = function () {
        if (typeof this.result === 'string') {
          try {
            const data = JSON.parse(this.result);
            onDropJson(file.name, data);
          } catch (err) {
            onDropInvalidJson(err);
          }
        }
      };

      reader.readAsText(event.dataTransfer.files[0]);
    }

    event.preventDefault();
  };

  element.addEventListener('dragenter', dragEnter);
  element.addEventListener('dragleave', dragLeave);
  element.addEventListener('dragover', dragOver);
  element.addEventListener('drop', dragDrop);

  onCleanup(() => {
    element.removeEventListener('dragenter', dragEnter);
    element.removeEventListener('dragleave', dragLeave);
    element.removeEventListener('dragover', dragOver);
    element.removeEventListener('drop', dragDrop);
  });

  return null;
};

export default DndJsonHandler;
