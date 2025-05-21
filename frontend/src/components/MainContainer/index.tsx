type MainContainerProps = {
  children: React.ReactNode;
};

export function MainContainer({ children }: MainContainerProps) {
  return (
    <div className="flex flex-1 justify-center items-center pb-10 px-5 lg:px-35">
      {children}
    </div>
  );
}
