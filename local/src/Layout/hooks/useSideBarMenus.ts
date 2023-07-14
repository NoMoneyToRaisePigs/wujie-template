export function useSideBarMenus() {
  const { options } = useRouter()
  const menus = []

  options.routes.forEach((r) => {

    const menu = {
      name: r.name ?? r.meta?.title ?? r.path,
      path: r.path,
    }

    menus.push(menu)
  })

  return menus
}