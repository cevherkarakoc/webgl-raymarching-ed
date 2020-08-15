precision mediump float;

#define MAX_STEPS 100
#define MAX_DIST 100.
#define SURF_DIST .001

#define S smoothstep

uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uCamRotation;
uniform float uZoom;

mat2 rotate2D(float a) {
    float s = sin(a);
    float c = cos(a);
    return mat2(c, -s, s, c);
}

%_SDF_%

float rayMarch(vec3 ro, vec3 rd) {
	float dO=0.;
    
    for(int i=0; i<MAX_STEPS; i++) {
    	vec3 p = ro + rd*dO;
        float dS = getSceneDist(p);
        dO += dS;
        if(dO>MAX_DIST || abs(dS)<SURF_DIST) break;
    }
    
    return dO;
}

vec3 getNormal(vec3 p) {
	float d = getSceneDist(p);
    vec2 e = vec2(.001, 0);
    
    vec3 n = d - vec3(
        getSceneDist(p-e.xyy),
        getSceneDist(p-e.yxy),
        getSceneDist(p-e.yyx));
    
    return normalize(n);
}

vec3 getRayDir(vec2 uv, vec3 p, vec3 l, float z) {
    vec3 f = normalize(l-p),
        r = normalize(cross(vec3(0,1,0), f)),
        u = cross(f,r),
        c = f*z,
        i = c + uv.x*r + uv.y*u,
        d = normalize(i);
    return d;
}

void main()
{
    vec2 uv = (gl_FragCoord.xy-(.5*uResolution.xy))/uResolution.y;
    
    vec3 col = vec3(0.);
    
    vec3 ro = vec3(0., uZoom, -uZoom);
    ro.yz *= rotate2D(uCamRotation.y);
    ro.xz *= rotate2D(uCamRotation.x);
    
    vec3 rd = getRayDir(uv, ro, vec3(0.), 1.);

    float d = rayMarch(ro, rd);
    
    if(d<MAX_DIST) {
    	vec3 p = ro + rd * d;
    	vec3 n = getNormal(p);
        vec3 lightDir = normalize(vec3(1,2.,-3)); 
        
    	vec3 ambient = vec3(0.2);
    	
        float diff = max(dot(n, lightDir), 0.0);
        vec3 diffuse = vec3(diff);

        // specular
        float specularStrength = 0.9;
        vec3 viewDir = -rd;
        vec3 reflectDir = reflect(-lightDir, n);  
        float spec = pow(max(dot(viewDir, reflectDir), 0.0), 64.);
        vec3 specular = vec3(specularStrength * spec); 
        
    	col += (ambient + diffuse + specular) * vec3(0.503, 0.035,0.117);;  
    }
    
    col = pow(col, vec3(.4545));	// gamma correction
    
    gl_FragColor = vec4(col,1.0);
}