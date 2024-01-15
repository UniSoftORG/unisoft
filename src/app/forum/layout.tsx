export const metadata = {
  title: {
    template: "%s | Forum KGB Hosting",
    default: "Forum KGB Hosting",
    absolute: "Forum KGB Hosting",
  },
  description: "#1 Community",
  openGraph: {
    images: [
      {
        url: "https://s3-eu-west-1.amazonaws.com/tpd/logos/56d72ad30000ff000589ae6e/0x0.png",
      },
    ],
  },
};

export default async function ForumLayout({
                                            children,
                                          }: {
  children: React.ReactNode;
}) {
  return (
    <main
      className="className={'forum h-screen flex flex-col pt-12 mt-16 lg:mt-0 ml-4 mr-4 lg:ml-52 lg:mr-16 z-30'}">{children}</main>
  );
}
