export default function Container({ children }: any) {
  return (
    <div
      style={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: "40px 0px"
      }}
    >
      {children}
    </div>
  )
}