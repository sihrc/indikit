module.exports = [
  {
    "sentiment": {
      title: "Sentiment",
      type: "text",
      endpoint: "/sentiment"
    }
  }, {
    "sentimentHQ": {
      title: "Sentiment HQ",
      type: "text",
      endpoint: "/sentimenthq"
    }
  }, {
    "language": {
      title: "Language",
      type: "text",
      endpoint: "/language"
    }
  }, {
    "political": {
      title: "Political",
      type: "text",
      endpoint: "/political"
    }
  }, {
    "keywords": {
      title: "Keywords",
      type: "text",
      endpoint: "/keywords"
    }
  }, {
    "textTags": {
      title: "Text Tags",
      type: "text",
      endpoint: "/texttags"
    }
  }, {
    "twitterEngagement": {
      title: "Twitter Engagement",
      type: "text",
      endpoint: "/twitterengagement"
    }
  }, {
    "namedEntities": {
      title: "Named Entities",
      type: "text",
      endpoint: "/namedentities"
    }
  }, {
    "intersections": {
      title: "Intersections",
      type: "text",
      endpoint: "/apis/intersections"
    }
  }, {
    "analyzeText": {
      title: "Analyze Text",
      type: "text",
      endpoint: "/apis/multiapi"
    }
  }, {
    "fer": {
      title: "Facial Emotion",
      type: "image",
      size: 48,
      endpoint: "/fer"
    }
  }, {
    "facialLocalization": {
      title: "Facial Localization",
      type: "image",
      size: false,
      endpoint: "/faciallocalization"
    }
  }, {
    "imageRecognition": {
      title: "Image Recognition",
      type: "image",
      size: 144,
      min_axis: true,
      endpoint: "/imagerecognition"
    }
  }, {
    "contentFiltering": {
      title: "Content Filtering",
      type: "image",
      size: 128,
      min_axis: true,
      endpoint: "/contentfiltering"
    }
  }, {
    "imageFeatures": {
      title: "Image Features",
      type: "image",
      size: 144,
      min_axis: true,
      endpoint: "/imagefeatures"
    }
  }, {
    "facialFeatures": {
      title: "Facial Features",
      type: "image",
      size: 48,
      endpoint: "/facialfeatures"
    }
  }, {
    "analyzeImage": {
      title: "Analyze Image",
      type: "image",
      size: 64,
      endpoint: "/apis/multiapi"
    }
  }
];
