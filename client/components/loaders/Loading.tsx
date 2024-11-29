const Loading = () => {
  return (
    <div className="flex flex-row items-center justify-center gap-2 h-screen ">
      <div className="w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:.7s]"></div>
      <div className="w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:.3s]"></div>
      <div className="w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:.7s]"></div>
    </div>
  );
};

export default Loading;
