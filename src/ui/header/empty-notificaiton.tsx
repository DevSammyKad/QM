import ImgTab from "@/src/components/imgTab/img-tab";

const EmptyNotification = () => {
  return (
    <div className="grid grid-cols-1 text-shade w-full justify-items-center items-center gap-2 p-5">
      <ImgTab
        src="/emptynotificatoin.png"
        alt="notification"
        className="w-[200px] h-full"
      />
      <p className="text-center text-xl">You’re all caught up</p>
      <p className="text-center">
        Come back later for Reminders, health tip, moments and weight
        notifications
      </p>
    </div>
  );
};
export default EmptyNotification;
