export default function Home() {
  return (
    <>
      <div className="d-flex justify-content-center">
        <h2>Welcome to the Senza Store!</h2>
      </div>
      <div className="d-flex justify-content-center m-2 p-2">
        <p>
          Welcome to the Senza Merch Page! Here you can buy our clothing, music,
          and more! Please see the store area for available items. If you have
          any questions you can go to the contact page and reach out! Thank you!
        </p>
      </div>
      <div className="d-flex justify-content-center mt-2">
        <iframe
          style={{ border: 0, width: 350, height: 470 }}
          src="https://bandcamp.com/EmbeddedPlayer/album=3281028558/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/transparent=true/"
          seamless
        >
          <a href="https://senza-sordino.bandcamp.com/album/even-a-worm-will-turn-2">
            Even a Worm Will Turn by Senza
          </a>
        </iframe>
      </div>
    </>
  );
}

//this is just a page that greets the user! I did some bootstrap styling to make it look nice :)
