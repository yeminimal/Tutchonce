const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { urls } = await req.json();
    
    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return new Response(
        JSON.stringify({ error: 'urls array is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const INDEXNOW_KEY = "a8f3c2e9b1d4f6a7c9e8b2d5f3a6c9e1b4d7f2a5c8e9b3d6f1a4c7e2b5d8f9a3";
    const SITE_HOST = "www.tutchonce.com.ng";
    
    console.log(`Submitting ${urls.length} URL(s) to IndexNow...`);
    
    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        host: SITE_HOST,
        key: INDEXNOW_KEY,
        keyLocation: `https://${SITE_HOST}/${INDEXNOW_KEY}.txt`,
        urlList: urls
      })
    });

    const statusText = response.statusText;
    console.log(`IndexNow submission status: ${response.status} - ${statusText}`);
    
    // IndexNow returns 200 for success, 202 for accepted
    const success = response.status === 200 || response.status === 202;
    
    return new Response(
      JSON.stringify({ 
        success,
        status: response.status,
        message: success ? 'URLs submitted successfully to IndexNow' : 'Submission failed',
        urls: urls
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: success ? 200 : response.status
      }
    );
  } catch (error) {
    console.error('IndexNow error:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
