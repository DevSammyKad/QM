import SendRequestSvg from '@/src/icons/sendRequestsvg';
import { PrimaryButton } from '@/src/ui/buttons/buttons';

type Props = {};

export default function NotifyButton({}: Props) {
  return (
    <div className="flex items-center  flex-col">
      <p className="text-2xl max-sm:text-xl text-shade font-semibold">
        Out of stock
      </p>
      <PrimaryButton
        startContent={<SendRequestSvg />}
        className="rounded-3xl py-2 mt-2 font-semibold justify-start"
      >
        <p className="flex-1  text-center">Send request</p>
      </PrimaryButton>
    </div>
  );
}
