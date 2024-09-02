import { Button } from "../ui/button"

function Header() {
  return (
    <div className="p-5 shadow-sm flex justify-between item-center px-5">
        <img src = '/logo.svg'/>
        <div>
            <Button>Sign In</Button>
        </div>
    </div>
  )
}

export default Header