YouTube records video views using a combination of techniques to accurately track and count the number of views a video receives. While the exact details of their implementation might not be publicly disclosed, here's a general overview of how YouTube could track video views:

1. **Client-Side Tracking**: When a user clicks on a video thumbnail to watch it, YouTube's front-end JavaScript code likely sends a view request to their servers. This request can include information such as the video's unique identifier, the user's session, and the device/browser details.

2. **Server-Side Validation**: YouTube's servers validate the view request to prevent fraudulent or automated views. They might check for various factors, such as view duration, IP address, user agent, and whether the request came from a legitimate user or a bot.

3. **Caching and Aggregation**: To handle the high volume of view requests, YouTube may use caching and aggregation techniques. Views might not be instantly updated in real-time but instead batched and processed periodically to update the view count on the video.

4. **View Count Logic**: YouTube likely has logic in place to differentiate between legitimate views and accidental or short-duration clicks. For example, if a user reloads a video multiple times within a short period, YouTube might not count those as separate views.

5. **Distributed Systems**: Given the massive scale of YouTube's user base and video content, they likely use distributed systems to efficiently handle view tracking and updating across their data centers.

6. **Verification and Anti-Fraud Measures**: YouTube employs various mechanisms to prevent view count manipulation, such as artificially inflating views through automated scripts or services. They might employ CAPTCHA challenges, IP filtering, and other anti-fraud measures.

7. **User Authentication**: For logged-in users, YouTube can tie video views to user accounts, enabling better tracking of individual user interactions with videos.

8. **Embedded Videos**: YouTube videos embedded on external websites also contribute to view counts. Similar mechanisms as mentioned above are likely used to track and count these views.

9. **View Count Display**: The view count displayed publicly on videos is often rounded to the nearest hundred or thousand to simplify the presentation.

10. **Live Video Streaming**: Live streaming views may be tracked differently due to the nature of real-time interactions. User engagement metrics like chat interactions and concurrent viewers might also influence view counts for live streams.

It's important to note that the actual implementation might be more complex and involve additional considerations to ensure accurate and reliable view tracking while preventing abuse.
