import Link from '@docusaurus/Link';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Button, Divider, Grid, Typography } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import React from 'react';

import styles from './component.module.css';

import { MichelsonType } from './MichelsonType';
import { Related } from './Related';

const Parameter = (props) => {
  console.log(props)
  return (
    <Grid item xs={12}>
      <Grid container>
        <Grid item xs={12}><Divider className={ styles.divider } style={{ marginBottom: '12px' }}/></Grid>
        <Grid item xs={2}>
          <Grid container>
            <Grid item xs={3}>
              <Typography>
                <code>{props.alias}</code> :
              </Typography>
            </Grid>
            { /* <Grid item xs={2}>
              <Typography>typed</Typography>
            </Grid>
             */ }
            <Grid item xs={9}>
              <Typography>
                <Link to={'/docs/reference/types#'+props.type}><code>{props.type}</code></Link>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={10}>
          <Typography style={{
            fontFamily: 'IBM Plex Sans'
          }}>
            {props.desc}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}

const Returns = (props) => {
  console.log(props)
  return (
    <Grid item xs={12}>
      <Grid container>
        <Grid item xs={12}><Divider className={ styles.divider } style={{ marginBottom: '12px' }}/></Grid>
        <Grid item xs={2}>
          <Typography>
            <Link to={'/docs/reference/types#'+props.type}><code>{props.type}</code></Link>
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <Typography style={{
            fontFamily: 'IBM Plex Sans'
          }}>
            {props.desc}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}

const Fails = (props) => {
  return ((props.fails === undefined || props.fails.length === 0) ? (
    <Typography style={{ fontFamily: 'IBM Plex Sans', color: 'grey', fontStyle: 'italic'}}>does not fail</Typography>
  ) : (
    <Grid container>
      { (props.fails.map((f,i) => {
        return (
          <Grid container style={{ marginBottom: (props.fails.length > 1 ? '4px' : '0px') }}>
          <Grid key={"f"+i} item xs={2}>
            <Typography><code>{f.keyword}</code></Typography>
          </Grid>
          <Grid key={"f"+i} item xs={10}>
            <Typography style={{
              fontFamily: 'IBM Plex Sans'
              }}>{f.desc}</Typography>
          </Grid>
          </Grid>
        )
      }))}
    </Grid>
  ))
}

const Info = (props) => {
  return (
    <Grid container direction="row" justifyContent="flex-start" alignItems="center" spacing={1} style={{ marginTop: '12px' }}>

    <Grid item xs={3} sm={2} md={2}>
      <Typography style={{ fontFamily: 'IBM Plex Sans', color: 'grey', }}>
        Fails with
      </Typography>
    </Grid>
    <Grid item xs={9} sm={10} md={10}>
      <Fails fails={props.fails} />
    </Grid>
    <Grid item xs={12}><Divider className={ styles.divider }/></Grid>
    {(props.michelson !== undefined) ? (
      <Grid item xs={3} sm={2} md={2}>
        <Typography style={{ fontFamily: 'IBM Plex Sans', color: 'grey', }}>
          Michelson
        </Typography>
      </Grid>
    ) : (<div />)}
    {(props.michelson !== undefined) ? (
      <Grid item xs={9} sm={10} md={10}>
        <MichelsonType michelson={props.michelson} michelson_ref_url={props.michelson_ref_url} />
      </Grid>
    ) : (<div />)}
    {(props.michelson !== undefined) ? (
      <Grid item xs={12}><Divider className={ styles.divider }/></Grid>
    ) : (<div />)}

    <Grid item xs={3} sm={2} md={2}>
      <Typography style={{ fontFamily: 'IBM Plex Sans', color: 'grey', }}>
        Related
      </Typography>
    </Grid>
    <Grid item xs={9} sm={10} md={10}>
      <Grid container direction="row" spacing={3}>
        {props.related.map((r,i) => <Related key={'rel'+i} value={r.keyword} link={r.link}></Related>)}
      </Grid>
    </Grid>
  </Grid>
  )
}

export default function Builtin(props) {
  return (
    <StyledEngineProvider injectFirst>
    <Grid container direction="row" justifyContent="flex-start" alignItems="center" spacing={1} style={{ marginBottom: '60px' }}>
      <Grid item xs={12} >
        <Typography style={{
          fontFamily: 'IBM Plex Sans',
          marginBottom: '12px'
        }}>
          {props.data.desc}
        </Typography>
      </Grid>
      {(props.data.parameters !== undefined) ? (
        <Grid item>
          <h4 style={{ marginBottom: '0px', color: 'grey', fontWeight: 'normal' }}>{ (props.data.parameters.length > 1) ? 'Parameters' : 'Parameter'}</h4>
        </Grid>
        ) : (<div />)
      }
      {(props.data.parameters !== undefined) ? (
        props.data.parameters.map((p,i) => {
          return <Parameter key={"bp"+i} alias={p.alias} type={p.type} desc={p.desc}/>
        })
        ) : (<div />)
      }
      <Grid item style={{ marginTop: '12px', color: 'grey' }}>
        <h4 style={{ marginTop: '12px', marginBottom: '0px', fontWeight: 'normal' }}>Returns</h4>
      </Grid>
      <Returns type={props.data.returns.type} desc={props.data.returns.desc} />
      <Grid item xs={12}>
        <Info fails={props.data.fails} michelson={props.data.michelson} michelson_ref_url={props.data.michelson_ref_url} related={props.data.related} />
      </Grid>
    </Grid>
    </StyledEngineProvider>
  )
}