function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function getSearchKeywords(plainText) {
  const items = plainText.split("\n");
  let searchKeywords = [];
  for (const item of items) {
    const searchkeyword = item.trim();
    if (searchkeyword.length == 0) {
      continue;
    }

    searchKeywords.push(searchkeyword);
  }
  return searchKeywords;
}

async function addPlaylist(plainText, delay = 200) {
  const searchKeywords = getSearchKeywords(plainText);
  let notFoundKeywords = [];

  for (const searchKeyword of searchKeywords) {
    document.querySelector("#d_kwd").value = searchKeyword;
    document.querySelector("#d_btn_search").click();
    await sleep(delay);
    const firstSongCheck = document.querySelector(".on .a_checkall");
    if (!firstSongCheck) {
      notFoundKeywords.push(searchKeyword);
      continue;
    }
    firstSongCheck.checked = true;
    document.querySelector(".move_right").click();
    await sleep(delay);
  }

  if (notFoundKeywords.length > 0) {
    console.log("--- notFounedList ---");
    console.log(notFoundKeywords);
  }

  console.log("--- completed ---");
}

const plainText = `
Carsie Blanton - Two Sleepy People
Kat Edmonson - 'S Wonderful
BLOSSOM DEARIE - Tout Doucement
Silje Nergaard - Dream A Little Dream
Stacey Kent - All I Do Is Dream Of You
Delicatessen - You're getting to be a habit with me
Matthieu Bore - It's A Good Day
Nancy Wilson - I Wish You Love
Stacey Kent - It Might As Well Be Spring
Carsie Blanton - Heavenly Thing
Girls from Mars - Spring Cleaning
Eva sur Seine - Stompin' at the Savoy
BLOSSOM DEARIE - They Say It's Spring
Catherine Russell - As Long As I Live
Diana Panton - Destination Moon
Caity Gyorgy - A Certain Someone
Alexis Cole, Bucky Pizzarelli - A Beautiful Friendship
Kat Edmonson - Mountain Greenery
Jeri Southern - It's Delovely
Delicatessen - Don't be that way
Joan Chamorro - Easy Living
`;
addPlaylist(plainText);
