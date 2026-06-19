import { Spinner } from "@/components/ui/spinner";

export function SpinnerCustom() {
  return (
    <div className="flex items-center gap-6">
      <Spinner className="text-white" />
    </div>
  );
}