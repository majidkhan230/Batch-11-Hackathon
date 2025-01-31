import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import InputForm from "./InputForm"

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Proceed</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
      <InputForm/>
      
      </DialogContent>
    </Dialog>
  )
}


export default DialogDemo