const database = {
  p1: {
    id: "p1",
    author: { name: "Mira", email: "mira@trendpulse.dev", verified: true },
    content: "Meet @sara at the hub #js #async",
    engagement: { likes: 12, shares: 2, comments: 4 },
    createdAt: "2026-04-01T09:00:00.000Z"
  },
  p2: {
    id: "p2",
    author: { name: "Rami", email: "invalid-email", verified: false },
    content: "Checkout #node tutorials",
    engagement: { likes: 3 },
    createdAt: "2026-04-02T11:30:00.000Z"
  },
  p3 : {
    id: "p3",
    author: { name: "Alex", email: "alex@trendpulse.dev", verified: true },
    content: "Exploring #react and #hooks",
   
    createdAt: "2026-04-03T14:00:00.000Z"
  } ,
  p4 : {
    id : "p4",
    author: { name: "Lily", email: "lily@trendpulse.dev", verified: true },
    content: "Diving into #vue with @Alex",
    engagement: { likes: 48, shares: 13, comments: 11 },
    createdAt: "2026-04-04T16:00:00.000Z"
  },
  p5 : {
    id: "p5",
    author: { name: "Sam", email: "samtrendpulse.dev", verified: false },
    content: "Learning about #graphql @Hello",
    engagement: { likes: 30, shares: 0, comments: 8 },
    createdAt: "2026-04-05T18:00:00.000Z"
  },
  p6 : {
    id: "p6",
    author: { name: "Felix", email: "felix@trendpulse.dev", verified: false },
    content: "Mastering #typescript with @Sam #Felix ",
    engagement: { likes: 225, shares: 100, comments: 50 },
    createdAt: ""
  }
};



//1.Rich post model
function describePostForUi(post) {
   const { id : title , author : {name : authorName }} = post;
   const metaPost = {...post ,  meta: { channel: "web" } };
   const keysCount = Object.keys(metaPost).length;

   return {title , authorName , keysCount };

}


//2.Safe nested reads
function getEngagementTotals(post) {
  const {engagement} = post;
  if (!engagement) {
    return {
      id: post.id,
      likes : 0,
      shares : 0,
      comments : 0
    }
  }
  return {
    id: post.id,
    likes : engagement?.likes ?? 0 ,
    shares : engagement?.shares ?? 0 ,
    comments : engagement?.comments ?? 0
  }
};


//3. Simulated async fetch
function fetchPostById(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // resolve post or reject "NOT_FOUND"
      const post = database[id];
      if (post) {
        resolve(post);
      }
      else {
        reject("NOT_FOUND");
      }
    }, 30);
  });
}


async function demoFetch(id) {
  try {
    const post = await fetchPostById(id);
    // use post
    console.log(`Post found: ${post.id}`, post);
    return post;
  } 
  catch (e) {
    // handle error
     console.log("Error fetching post:", e);
  } finally {
    // always log "done"
    console.log("demoFetch done!");
  }
}


//4.Regex: email, hashtags, mentions

function analyzePostText(post) {
  // emailValid from post.author.email; tags & mentions from post.content
  const emailOk = /^[\w.-]+@[\w.-]+\.\w{2,}$/;
  const hashTag = /#[\w؀-ۿ]+/g;
  const mention = /@[\w]+/g;
  const id = post.id;

  const emailValid = emailOk.test(post.author.email);
  const tags = post.content.match(hashTag);
  const mentions = post.content.match(mention);

  return { id, emailValid, tags, mentions };
}


//5.Event loop: predict order
/*console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => console.log("3"));
console.log("4");
*/
//Predicted Order : 1, 4, 3, 2





//6.Date format + live refresh timer
function formatIsoDateOnly(iso) {
  if (!iso) return null ;
  else {
    const d = new Date(iso);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }  
}



//live refresh demo
function startRefreshDemo(onTick) {
  let n = 0;
  const id = setInterval(() => {
    n++;
    onTick(n);
    if (n >= 3) {
      clearInterval(id);
      console.log("Refresh demo finished");
    }
  }, 200);
}



//7.Final orchestrator
async function runTrendPulsePhase2() {
  const ids = ["p1", "p2", "p3", "p4", "p5", "p6"];
  // loop: await fetchPostById(id), count valid emails, collect formatted dates, track first invalid id
  let loaded = 0;
  let validEmails = 0;
  let invalidAuthorFlag = false;
  let invalidAuthorId = null;
  let datesFormatted = [];

  for ( const id of ids) {
    try {
      //console.log(id);
      const post = await fetchPostById(id);
      //console.log("Post found:", post);
  
      loaded++;
      //console.log(`loaded Posts Count: ${loaded}`);

      if (analyzePostText(post).emailValid) {
        validEmails++;
      }
      else if (!invalidAuthorFlag) {
        invalidAuthorFlag = true;
        invalidAuthorId = id;
      }
    
      if (post.createdAt) {
        datesFormatted.push(formatIsoDateOnly(post.createdAt));
     }
    }
    catch (error) {
      console.log("Error fetching post:", error);
    }
    finally {
      console.log("done");
    }
  }
  if (!invalidAuthorFlag) {
    invalidAuthorId = null;
  }

  return {
    loaded,
    validEmails,
    invalidAuthorId,
    datesFormatted
  }
}




//Output in order

//1.Rich post model
console.log("Test describePostForUi ------------");
let metaPosts = [];
Object.keys(database).forEach(key => {
  metaPosts.push(describePostForUi(database[key]));
  //console.log(meta[meta.length - 1]);
});

console.log(metaPosts);

//2.Safe nested reads
console.log("Test getEngagementTotals ------------");
let engagementScore = [];
Object.keys(database).forEach(key => {
  engagementScore.push(getEngagementTotals(database[key]));
  //console.log(`Post ${key} engagement score:`, engagementScore[engagementScore.length - 1]);
});

console.log(engagementScore);

//3.Simulated async fetch
console.log("Test fetchPostById ------------");
const fetch = await fetchPostById("p4")
  .then(post => {
    console.log("Post found:", post);
  })
  .catch(error => {
    console.error("Error fetching post:", error);
  });

 console.log("Test demoFetch ------------");
  const demoFetchTest = await demoFetch("p99");


  
//4. Regex: email, hashtags, mentions
console.log("Test analyzePostText ------------");
let analyzedPost = [];
Object.keys(database).forEach(key => {
  analyzedPost.push(analyzePostText(database[key]));
  //console.log(`Post ${key} analysis:`, analyzedPost[analyzedPost.length - 1]);
})

console.log(analyzedPost);

//5. Event loop: predict order
console.log("Test event loop order ------------");
console.log("Predicted Order : 1, 4, 3, 2");
console.log("1 is logged first because it's a synchronous operation , 2 and 3 are asynchronous and will be handed over to the WEB API for execution. so 4 is logged next because it comes next in the call stack. Both 2 and 3 finish at the same time but 2 is logged next because Promise has priority over setTimeout then lastly 3 is logged");
console.log("Actual Order : 1, 4, 3, 2");

//6. Date format + live refresh timer
console.log("Test formatIsoDateOnly ------------");
console.log(formatIsoDateOnly("2026-08-02T11:30:00.000Z"));


startRefreshDemo((n) => console.log(`Refresh tick: ${n}`));

//7.Final orchestrator
console.log("Test runTrendPulsePhase2 ------------");
runTrendPulsePhase2().then(result => {
  console.log("RESULT:", result);


});
