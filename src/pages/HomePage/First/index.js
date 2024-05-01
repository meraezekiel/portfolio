import { Diversity1Outlined } from '@mui/icons-material';
import React from 'react'
import Typed from 'typed.js';
import "./styles.scss"
import profile from '../../../assets/images/profile2.jpg'

export default function First({string}) {
    const el = React.useRef(null);

    React.useEffect(() => {
        const typed = new Typed(el.current, {
          strings: string,
          typeSpeed: 100,
          loop:true
        });
    
        return () => {
          // Destroy Typed instance during cleanup to stop animation
          typed.destroy();
        };
    }, []);

  return (
    <div
        style={{
            justifyContent:'center',
            alignItems:'center',
            flexDirection:'row',
            display:'flex',
            flex:1,
            paddingTop:'5%',
            paddingBottom:'5%'
        }}
    >
        <div
            style={{
                flex:1
            }}
        >
            <div
                style={{
                    marginBottom:'5%'
                }}
            >
                <h1
                    style={{
                        fontSize:40
                    }}
                >
                    Hello, It's Me
                </h1>
                <h1
                    style={{
                        fontSize:60
                    }}
                >
                    John Louie Antoque
                </h1>
                <h1
                    style={{
                        fontSize:30
                    }}
                >
                    And I'm a  <span ref={el} />
                </h1>
                
            </div>

            <div
                style={{
                    flexDirection:'row',
                    flexWrap:'wrap',
                }}
            >
                <h1
                    style={{
                        fontSize:20,
                        fontWeight:'500',
                        zIndex:999,
                        position: 'relative'
                    }}
                >
                    I bring enthusiasm and a solid grasp of both front-end and
                    back-end technologies. Eager to apply my skills in crafting cohesive web and mobile
                    applications, I prioritize user needs, aiming for intuitive and user-friendly solutions. With a
                    growth mindset, I'm dedicated to continual learning and improvement, striving for
                    excellence in every project. I'm committed to delivering high-quality solutions that exceed
                    expectations and positively contribute to the team.
                </h1>
            </div>
        </div>
        <div
            className='img_cont'
        >
            <img
                className='img_bg'
                src={profile}
            ></img>
        </div>
    </div>
  )
}
