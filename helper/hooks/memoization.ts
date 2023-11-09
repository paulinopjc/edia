import { useMemo } from "react";

interface IMemoizedComponent {
  children: any;
  dependency: any[];
}

const MemoizedComponent: React.FC<IMemoizedComponent> = ({ children, dependency }) => {
  const memoizedValue = useMemo(() => children, dependency);
  return memoizedValue;
};

export default MemoizedComponent;