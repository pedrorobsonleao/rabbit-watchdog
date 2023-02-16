function main() {
  local parms=;

  if [ ! -z "${rabbit__url}" ];           then parms="${parms} --rabbit.url          ${rabbit__url} ";           fi
  if [ ! -z "${rabbit__username}" ];      then parms="${parms} --rabbit.username     ${rabbit__username} ";      fi       
  if [ ! -z "${rabbit__password}" ];      then parms="${parms} --rabbit.password     ${rabbit__password} ";      fi       
  if [ ! -z "${rabbit__time_since}" ];    then parms="${parms} --rabbit.time_since   ${rabbit__time_since} ";    fi 
  if [ ! -z "${rabbit__filter__vhost}" ]; then parms="${parms} --rabbit.filter.vhost ${rabbit__filter__vhost} "; fi
  if [ ! -z "${rabbit__filter__queue}" ]; then parms="${parms} --rabbit.filter.queue ${rabbit__filter__queue} "; fi
  if [ ! -z "${slack__url}" ];            then parms="${parms} --slack.url           ${slack__url} ";            fi
  if [ ! -z "${slack__channel}" ];        then parms="${parms} --slack.channel       ${slack__channel} ";        fi
  if [ ! -z "${slack__emoji}" ];          then parms="${parms} --slack.emoji         ${slack__emoji} ";          fi
  yarn --silent start  ${parms} ${@};
}

main ${@};
