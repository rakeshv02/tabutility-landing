<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title><xsl:value-of select="/rss/channel/title"/> — RSS Feed</title>
        <style>
          *{box-sizing:border-box;margin:0;padding:0}
          body{font-family:'Segoe UI',system-ui,Arial,sans-serif;background:#f8fafc;color:#1e293b;line-height:1.6}
          header{background:#1a1a2e;padding:24px 20px;text-align:center}
          header h1{color:#fff;font-size:22px;font-weight:800}
          header p{color:#94a3b8;font-size:13px;margin-top:6px}
          .badge{display:inline-block;background:#4f46e5;color:#fff;font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;margin-top:10px}
          .container{max-width:780px;margin:32px auto;padding:0 20px 60px}
          .subscribe{background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:16px 20px;margin-bottom:28px;display:flex;align-items:center;gap:14px;box-shadow:0 1px 3px rgba(0,0,0,.06)}
          .subscribe code{background:#f1f5f9;padding:4px 10px;border-radius:6px;font-size:13px;color:#4f46e5;word-break:break-all}
          article{background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:22px 24px;margin-bottom:16px;box-shadow:0 1px 3px rgba(0,0,0,.06)}
          article h2{font-size:18px;color:#1e293b;margin-bottom:8px;line-height:1.35}
          article h2 a{color:inherit;text-decoration:none}
          article h2 a:hover{color:#4f46e5}
          .meta{font-size:12px;color:#94a3b8;margin-bottom:12px}
          .desc{font-size:14px;color:#475569;line-height:1.6}
          .read-more{display:inline-block;margin-top:14px;font-size:13px;font-weight:700;color:#4f46e5;text-decoration:none}
          .read-more:hover{text-decoration:underline}
          footer{text-align:center;color:#94a3b8;font-size:12px;margin-top:40px}
          footer a{color:#818cf8;text-decoration:none}
        </style>
      </head>
      <body>
        <header>
          <h1>⚡ <xsl:value-of select="/rss/channel/title"/></h1>
          <p><xsl:value-of select="/rss/channel/description"/></p>
          <span class="badge">RSS Feed</span>
        </header>
        <div class="container">
          <div class="subscribe">
            <span style="font-size:22px">📡</span>
            <div>
              <strong style="font-size:13px;display:block;margin-bottom:4px">Subscribe in your feed reader</strong>
              <code>https://tabutility.com/blog/feed.xml</code>
            </div>
          </div>
          <xsl:for-each select="/rss/channel/item">
            <article>
              <h2><a href="{link}"><xsl:value-of select="title"/></a></h2>
              <div class="meta"><xsl:value-of select="pubDate"/></div>
              <div class="desc"><xsl:value-of select="description"/></div>
              <a class="read-more" href="{link}">Read full article →</a>
            </article>
          </xsl:for-each>
          <footer>
            <a href="https://tabutility.com">tabutility.com</a> · Free browser tools · No sign-up
          </footer>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
