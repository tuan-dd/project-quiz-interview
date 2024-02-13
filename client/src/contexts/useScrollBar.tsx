import {
  createContext,
  UIEvent,
  ReactElement,
  RefObject,
  useCallback,
  useContext,
  useRef,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

interface IMyScrollbarContext {
  currentScrollTop: number;
  setCurrentScrollTop?: Dispatch<SetStateAction<number>>;
  ref: RefObject<ReactElement> | null;
}

const intValue: IMyScrollbarContext = {
  currentScrollTop: 0,
  setCurrentScrollTop: undefined,
  ref: null,
};

const ScrollbarContext = createContext<IMyScrollbarContext>(intValue);

const ScrollbarProvider = (props: { children?: ReactElement }) => {
  const [currentScrollTop, setCurrentScrollTop] = useState(0);
  const handleScroll = useCallback((e: UIEvent) => {
    setCurrentScrollTop((e.target as HTMLElement).scrollTop);
  }, []);

  const hanh = useRef(null);

  return (
    <ScrollbarContext.Provider value={{ currentScrollTop, setCurrentScrollTop, ref: hanh }}>
      <Scrollbars onScroll={handleScroll} ref={hanh} className="min-h-screen !w-screen" autoHide>
        {props?.children}
      </Scrollbars>
    </ScrollbarContext.Provider>
  );
};

const useScrollbarContext = () => {
  const { currentScrollTop, ref } = useContext(ScrollbarContext);

  const scrollToTop = useCallback(
    (positionY: number) => {
      if (!ref || !ref.current) return;
      const x = ref.current as any;
      if (x.view?.scrollTop) {
        x.view?.scroll({
          top: positionY,
          left: 0,
          behavior: 'smooth',
        });
      }
    },
    [ref],
  );

  return {
    currentScrollTop,
    scrollToTop,
  };
};

export { ScrollbarProvider, useScrollbarContext };
