"use client"

import { Button } from "@/components/ui/button"
import { AuthContext } from "@/shared/lib/context"
import { useContext } from "react"
import Link from "next/link"

export function NavBar() {
  const {isAuth, setIsAuth} = useContext(AuthContext)

  return (
    <nav className="flex gap-2">
        {isAuth
          ? (<>
          <Button size="sm">Ваш аккаунт</Button>
          <Button size="sm" onClick={() => setIsAuth(false)}>Выйти</Button>
        </>)
          : (<>
            <Button size="sm" onClick={() => setIsAuth(true)}>Войти</Button>
            <Button size="sm" asChild>
              <Link href="/signup">Зарегистрироваться</Link>
            </Button>
        </>)
      }
    </nav>
  )
}